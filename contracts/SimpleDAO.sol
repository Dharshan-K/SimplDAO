// SPDX-License-Identifier: MIT
pragma solidity ^8.0.0;

contract SimplDAO {
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
    uint public proposalCount = 0;
    mapping(uint => Proposal) public ProposalData;
    mapping(Proposal => mapping(uint256 => address)) public votersData;

    enum voteOption{yes,no}

    function createProposal(
        string _Title,
        string _Description
    ) public {
        proposalCount++;
        Proposal memory proposal = ProposalData[proposalCount];
        proposal.ProposalID = proposalCount;
        proposal.proposalTitle = _Title;
        proposal.proposalDescription = _Description;
        proposal.createdBy = msg.sender;
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
