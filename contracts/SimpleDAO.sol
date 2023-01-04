// SPDX-License-Identifier: MIT
pragma solidity ^8.0.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimplDAO is SimplDAONFT{
    using Counters for Counters.Counter;
    

    struct Proposal {
        uint ProposalID;
        string proposalTitle;
        string proposalDescription;
        address createdBy;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 totalVotes;
        bool excecuted;
    }

    struct NFTData{
        string nftName;
        string nftSymbol;
        address nftAddress;
        address nftOwner;
    }

    Counters.Counter public proposalCount;

    mapping(uint => Proposal) public ProposalData;
    mapping(Proposal => mapping(uint256 => address)) public votersData;
    mapping (uint=>NFTData) NFTMap;

    event proposalCreated(uint _id, string Title, address createdBy);
    

    enum voteOption{yes,no}

    function deploy(string memory _name, string memory _name) public return(address newContract){

    }

    function createToken(string _name, string _symbol) private{
        
    }

    function createProposal(
        string _Title,
        string _Description
    ) public {
        Proposal memory proposal = ProposalData[proposalCount];
        proposal.ProposalID = proposalCount.current();
        proposal.proposalTitle = _Title;
        proposal.proposalDescription = _Description;
        proposal.createdBy = msg.sender();
        proposalCount.increment();
        emit proposalCreated(ProposalID, proposalTitle, msg.sender);
    }

    function voteProposal(uint _proposalId, voteOption vote) public {
        require(_proposalId>0, "Proposal doesn't exist");
        Proposal memory proposal = ProposalData[_proposalId]
        if (vote==voteOption.yes){
            proposal.yesVotes++;
        }else if(vote == voteOption.no){
            proposal.noVotes++;
        }        
    }

    function exceuteProposal(uint _proposalId) public {
        require(_proposalId>0, "Proposal doesn't exist");
        Proposal memory proposal = ProposalData[_proposalId]
        if (proposal.yesVotes>proposal.noVotes){
            proposal.excecuted = true;
        }else if(proposal.yesVotes<proposal.noVotes){
            proposal.excecuted = false;
        }
    }

    function getProposalCount() public view returns(uint){
        return proposalCount;
    }

    function getProposal(uint _proposalId) public view returns(Proposal){
        assert()
        Proposal memory proposal = ProposalData[_proposalId];
        return proposal;
    }
 
}


contract SimplDAONFT is ERC721{

    using Counters for Counters.Counter;
    Counters.Counter public _nftCount;
    Counters.Counter public _nftOwnerCount;

    mapping(uint256=>address) public nftHolders;

    mapping(nftHolders=>uint256) public nftOwned;

    constructor(string memory name, string memory symbol) ERC721(name,symbol){}

    function mint(address _user,uint256 supply) returns(uint256){
        for(uint i=1;i<=supply;i++){
            _mint(_user,_nftCount.current());
            _approve(_user,_nftCount.current());
            _nftCount.increment();
        }

    }

    function transferNFT(address _user, uint256 _tokenId) public {
        _transfer(_user,_tokenId)
    }







}
