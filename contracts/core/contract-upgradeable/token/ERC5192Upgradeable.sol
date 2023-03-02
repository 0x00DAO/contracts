// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol";
import "../interface/ERC5192/IERC5192Upgradeable.sol";

contract ERC5192Upgradeable is
    Initializable,
    ContextUpgradeable,
    IERC5192Upgradeable,
    ERC165Upgradeable
{
    mapping(uint256 => bool) private _locked;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    function __ERC5192_init() internal onlyInitializing {
        __ERC5192_init_unchained();
    }

    function __ERC5192_init_unchained() internal onlyInitializing {}

    /**
     *
     * Requirements:
     *
     * - The token must not be locked.
     */
    modifier whenNotLock(uint256 tokenId) {
        _requireNotLock(tokenId);
        _;
    }

    /**
     *
     * Requirements:
     *
     * - The token must be locked.
     */
    modifier whenLocked(uint256 tokenId) {
        _requireLock(tokenId);
        _;
    }

    /**
     * @dev Throws if the contract is locked.
     */
    function _requireNotLock(uint256 tokenId) internal view virtual {
        require(!_isLocked(tokenId), "Token Lock: locked");
    }

    /**
     * @dev Throws if the contract is not locked.
     */
    function _requireLock(uint256 tokenId) internal view virtual {
        require(_isLocked(tokenId), "Token Lock: not locked");
    }

    /// @notice Returns the locking status of an Soulbound Token
    /// @dev SBTs assigned to zero address are considered invalid, and queries
    /// about them do throw.
    /// @param tokenId The identifier for an SBT.
    function locked(uint256 tokenId) external view override returns (bool) {
        return _isLocked(tokenId);
    }

    function _isLocked(uint256 tokenId) internal view returns (bool) {
        return _locked[tokenId];
    }

    /// @notice Locks a token
    /// @dev Locking a token prevents it from being transferred.
    /// @param tokenId The identifier for a token.
    function lock(uint256 tokenId) internal virtual {
        _locked[tokenId] = true;
        emit Locked(tokenId);
    }

    /// @notice Unlocks a token
    /// @dev Unlocks a token, allowing it to be transferred.
    /// @param tokenId The identifier for a token.
    function unlock(uint256 tokenId) internal virtual {
        _locked[tokenId] = false;
        emit Unlocked(tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC165Upgradeable, IERC165Upgradeable)
        returns (bool)
    {
        return
            interfaceId == type(IERC5192Upgradeable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[44] private __gap;
}
