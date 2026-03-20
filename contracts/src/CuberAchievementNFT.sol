// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract CuberAchievementNFT is ERC721, AccessControl, Pausable, EIP712 {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    bytes32 public constant MINT_REQUEST_TYPEHASH =
        keccak256(
            "MintRequest(address to,bytes32 taskId,bytes32 metadataURIHash,uint256 deadline)"
        );

    struct MintRequest {
        address to;
        bytes32 taskId;
        string metadataURI;
        uint256 deadline;
    }

    struct Achievement {
        bytes32 taskId;
        uint64 mintedAt;
        address recipient;
    }

    error InvalidAddress();
    error InvalidSignature();
    error SignatureExpired();
    error AlreadyMinted(bytes32 claimKey);

    uint256 public nextTokenId = 1;
    address public signer;
    string private baseTokenURI;

    mapping(uint256 => Achievement) public achievements;
    mapping(bytes32 => bool) public mintedClaims;
    mapping(uint256 => string) private tokenMetadataUris;

    event SignerUpdated(address indexed previousSigner, address indexed newSigner);
    event BaseURIUpdated(string previousBaseURI, string newBaseURI);
    event AchievementMinted(
        address indexed to,
        uint256 indexed tokenId,
        bytes32 indexed taskId,
        bytes32 claimKey,
        string metadataURI
    );

    constructor(address admin, address initialSigner, string memory initialBaseURI)
        ERC721("Moledao Cuber Achievement", "CUBER")
        EIP712("Moledao Cuber Achievement", "1")
    {
        if (admin == address(0) || initialSigner == address(0)) revert InvalidAddress();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(PAUSER_ROLE, admin);

        signer = initialSigner;
        baseTokenURI = initialBaseURI;
    }

    function mintWithSignature(MintRequest calldata request, bytes calldata signature)
        external
        whenNotPaused
        returns (uint256 tokenId)
    {
        if (request.deadline < block.timestamp) revert SignatureExpired();

        bytes32 digest = _hashTypedDataV4(_hashMintRequest(request));
        address recoveredSigner = ECDSA.recover(digest, signature);
        if (recoveredSigner != signer) revert InvalidSignature();

        return _mintAchievement(request.to, request.taskId, request.metadataURI);
    }

    function adminMint(address to, bytes32 taskId, string calldata metadataURI)
        external
        onlyRole(MINTER_ROLE)
        whenNotPaused
        returns (uint256 tokenId)
    {
        return _mintAchievement(to, taskId, metadataURI);
    }

    function hasMinted(address user, bytes32 taskId) external view returns (bool) {
        return mintedClaims[claimKey(user, taskId)];
    }

    function claimKey(address user, bytes32 taskId) public pure returns (bytes32) {
        return keccak256(abi.encode(user, taskId));
    }

    function hashMintRequest(MintRequest calldata request) external view returns (bytes32) {
        return _hashTypedDataV4(_hashMintRequest(request));
    }

    function setSigner(address newSigner) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newSigner == address(0)) revert InvalidAddress();

        address previousSigner = signer;
        signer = newSigner;
        emit SignerUpdated(previousSigner, newSigner);
    }

    function setBaseURI(string calldata newBaseURI) external onlyRole(DEFAULT_ADMIN_ROLE) {
        string memory previousBaseURI = baseTokenURI;
        baseTokenURI = newBaseURI;
        emit BaseURIUpdated(previousBaseURI, newBaseURI);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        string memory explicitTokenURI = tokenMetadataUris[tokenId];
        if (bytes(explicitTokenURI).length > 0) {
            return explicitTokenURI;
        }

        string memory baseURI = _baseURI();
        if (bytes(baseURI).length == 0) {
            return "";
        }

        return string.concat(baseURI, Strings.toString(tokenId));
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function _mintAchievement(address to, bytes32 taskId, string memory metadataURI)
        internal
        returns (uint256 tokenId)
    {
        if (to == address(0)) revert InvalidAddress();

        bytes32 key = claimKey(to, taskId);
        if (mintedClaims[key]) revert AlreadyMinted(key);

        tokenId = nextTokenId++;
        mintedClaims[key] = true;
        achievements[tokenId] = Achievement({
            taskId: taskId,
            mintedAt: uint64(block.timestamp),
            recipient: to
        });

        _safeMint(to, tokenId);

        if (bytes(metadataURI).length > 0) {
            tokenMetadataUris[tokenId] = metadataURI;
        }

        emit AchievementMinted(to, tokenId, taskId, key, metadataURI);
    }

    function _hashMintRequest(MintRequest calldata request) internal pure returns (bytes32) {
        return keccak256(
            abi.encode(
                MINT_REQUEST_TYPEHASH,
                request.to,
                request.taskId,
                keccak256(bytes(request.metadataURI)),
                request.deadline
            )
        );
    }
}
