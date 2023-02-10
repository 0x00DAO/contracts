// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "../../core/contract-upgradeable/VersionUpgradeable.sol";

/**
 * @title BNB\ERC20\ERC721 Token with control over token transfers
 */
contract TokenSafeBox is
    Initializable,
    AccessControlUpgradeable,
    ERC721HolderUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable,
    VersionUpgradeable
{
    event TokenReceived(address from, uint256 amount);
    event Withdraw(address to, uint256 amount);
    event WithdrawERC20(
        IERC20Upgradeable indexed token,
        address indexed to,
        uint256 amount
    );
    event WithdrawERC721(
        IERC721Upgradeable indexed token,
        address indexed to,
        uint256 tokenId
    );

    bytes32 public constant WITHDRAW = keccak256("WITHDRAW");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __AccessControl_init();
        __ERC721Holder_init();
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();
        __Pausable_init();
        __VersionUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyRole(UPGRADER_ROLE)
    {}

    receive() external payable virtual {
        emit TokenReceived(_msgSender(), msg.value);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function _version() internal pure virtual override returns (uint256) {
        return 2;
    }

    function withdraw(address payable to, uint256 amount)
        public
        whenNotPaused
        nonReentrant
        onlyRole(WITHDRAW)
    {
        AddressUpgradeable.sendValue(to, amount);
        emit Withdraw(to, amount);
    }

    function withdrawERC20(
        IERC20Upgradeable token,
        address to,
        uint256 value
    ) public whenNotPaused nonReentrant onlyRole(WITHDRAW) {
        SafeERC20Upgradeable.safeTransfer(token, to, value);
        emit WithdrawERC20(token, to, value);
    }

    function withdrawERC721(
        IERC721Upgradeable token,
        address to,
        uint256 tokenId
    ) public whenNotPaused nonReentrant onlyRole(WITHDRAW) {
        token.safeTransferFrom(address(this), to, tokenId);
        emit WithdrawERC721(token, to, tokenId);
    }
}
