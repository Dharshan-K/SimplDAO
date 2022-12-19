// SPDX-License-Identifier: MIT
pragma solidity ^8.0.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimplDAO {
    using Counters for Counters.Counter;
    
    struct NFTData{
        string _name;
        string _symbol;
    }

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

    Counters.Counter public proposalCount;

    mapping(uint => Proposal) public ProposalData;
    mapping(Proposal => mapping(uint256 => address)) public votersData;
    mapping (uint=>NFTData) NFTMap;

    event proposalCreated(uint _id, string Title, address createdBy);
    

    enum voteOption{yes,no}

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
        proposal.createdBy = msg.sender;
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
