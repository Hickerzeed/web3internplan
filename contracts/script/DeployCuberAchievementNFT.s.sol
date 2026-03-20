// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {CuberAchievementNFT} from "../src/CuberAchievementNFT.sol";

contract DeployCuberAchievementNFT is Script {
    function run() external returns (CuberAchievementNFT deployed) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address admin = vm.envAddress("ADMIN_ADDRESS");
        address signer = vm.envAddress("SIGNER_ADDRESS");
        string memory baseURI = vm.envString("BASE_URI");

        vm.startBroadcast(deployerPrivateKey);
        deployed = new CuberAchievementNFT(admin, signer, baseURI);
        vm.stopBroadcast();
    }
}

