// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {CuberAchievementNFT} from "../src/CuberAchievementNFT.sol";

contract CuberAchievementNFTTest is Test {
    uint256 internal signerPrivateKey = 0xA11CE;
    address internal admin = makeAddr("admin");
    address internal user = makeAddr("user");
    address internal signer = vm.addr(signerPrivateKey);

    CuberAchievementNFT internal nft;

    function setUp() public {
        nft = new CuberAchievementNFT(admin, signer, "https://metadata.moledao.io/");
    }

    function testMintWithSignatureSucceeds() public {
        CuberAchievementNFT.MintRequest memory request = _request(
            user, keccak256("task:discover-001"), "ipfs://achievement-1", block.timestamp + 1 days
        );

        bytes memory signature = _signRequest(request);

        uint256 tokenId = nft.mintWithSignature(request, signature);

        assertEq(tokenId, 1);
        assertEq(nft.ownerOf(tokenId), user);
        assertTrue(nft.hasMinted(user, request.taskId));
        assertEq(nft.tokenURI(tokenId), request.metadataURI);

        (bytes32 taskId, uint64 mintedAt, address recipient) = nft.achievements(tokenId);
        assertEq(taskId, request.taskId);
        assertEq(recipient, user);
        assertEq(uint256(mintedAt), block.timestamp);
    }

    function testMintWithSignatureRejectsReplay() public {
        CuberAchievementNFT.MintRequest memory request = _request(
            user, keccak256("task:discover-002"), "ipfs://achievement-2", block.timestamp + 1 days
        );

        bytes memory signature = _signRequest(request);

        nft.mintWithSignature(request, signature);

        vm.expectRevert(
            abi.encodeWithSelector(
                CuberAchievementNFT.AlreadyMinted.selector,
                nft.claimKey(user, request.taskId)
            )
        );
        nft.mintWithSignature(request, signature);
    }

    function testMintWithSignatureRejectsExpiredRequest() public {
        CuberAchievementNFT.MintRequest memory request = _request(
            user, keccak256("task:discover-003"), "ipfs://achievement-3", block.timestamp - 1
        );

        bytes memory signature = _signRequest(request);

        vm.expectRevert(CuberAchievementNFT.SignatureExpired.selector);
        nft.mintWithSignature(request, signature);
    }

    function testMintWithSignatureRejectsWrongSigner() public {
        CuberAchievementNFT.MintRequest memory request = _request(
            user, keccak256("task:discover-004"), "ipfs://achievement-4", block.timestamp + 1 days
        );

        (uint8 v, bytes32 r, bytes32 s) =
            vm.sign(0xB0B, nft.hashMintRequest(request));
        bytes memory signature = abi.encodePacked(r, s, v);

        vm.expectRevert(CuberAchievementNFT.InvalidSignature.selector);
        nft.mintWithSignature(request, signature);
    }

    function testAdminMintRequiresRole() public {
        vm.prank(user);
        vm.expectRevert();
        nft.adminMint(user, keccak256("task:discover-005"), "ipfs://achievement-5");

        vm.prank(admin);
        uint256 tokenId =
            nft.adminMint(user, keccak256("task:discover-005"), "ipfs://achievement-5");

        assertEq(tokenId, 1);
        assertEq(nft.ownerOf(tokenId), user);
    }

    function testPauseBlocksMinting() public {
        vm.prank(admin);
        nft.pause();

        CuberAchievementNFT.MintRequest memory request = _request(
            user, keccak256("task:discover-006"), "ipfs://achievement-6", block.timestamp + 1 days
        );

        bytes memory signature = _signRequest(request);

        vm.expectRevert();
        nft.mintWithSignature(request, signature);
    }

    function _request(
        address to,
        bytes32 taskId,
        string memory metadataURI,
        uint256 deadline
    ) internal pure returns (CuberAchievementNFT.MintRequest memory) {
        return CuberAchievementNFT.MintRequest({
            to: to,
            taskId: taskId,
            metadataURI: metadataURI,
            deadline: deadline
        });
    }

    function _signRequest(CuberAchievementNFT.MintRequest memory request)
        internal
        view
        returns (bytes memory)
    {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPrivateKey, nft.hashMintRequest(request));
        return abi.encodePacked(r, s, v);
    }
}
