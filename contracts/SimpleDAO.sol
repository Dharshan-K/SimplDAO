// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


contract SimplDAO {
    using Counters for Counters.Counter;
    address _owner;
    

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

    uint public proposalCount;

    mapping(uint => Proposal) public ProposalData;

    event proposalCreated(uint _id, string Title, address createdBy);
    

    enum voteOption{yes,no}

    constructor(){
        _owner = msg.sender;
    }


    function createProposal(
        string memory _Title,
        string memory _Description
    ) public {
        Proposal storage proposal = ProposalData[proposalCount];
        proposal.ProposalID = proposalCount;
        proposal.proposalTitle = _Title;
        proposal.proposalDescription = _Description;
        proposal.createdBy = msg.sender;
        proposalCount++;
        emit proposalCreated(proposal.ProposalID, proposal.proposalTitle, msg.sender);
    }

    function voteProposal(uint _proposalId, voteOption vote,address nftAddress) public {
        require(_proposalId>=0, "Proposal doesn't exist");
        uint256 temp=0;        
        console.log("voting begins");
        Proposal storage proposal = ProposalData[_proposalId];
        uint256 voteCount = getBalance(nftAddress);
        require(voteCount > 0, "The user doesnt's own any NFT");
        if (vote==voteOption.yes){
            temp = proposal.yesVotes+voteCount;
            proposal.yesVotes=temp;
            console.log("voted for yes");
            console.log(proposal.yesVotes);
        }else if(vote == voteOption.no){
            temp = proposal.noVotes+voteCount;
            proposal.noVotes=temp;
            console.log("voted for no");
            console.log(proposal.noVotes);
        } 
              
    }

    function exceuteProposal(uint _proposalId) public {
        require(_proposalId>=0, "Proposal doesn't exist");
        Proposal storage proposal = ProposalData[_proposalId];
        
        require(msg.sender==proposal.createdBy, "the owner only can excecute the proposal");
        if (proposal.yesVotes>proposal.noVotes){
            proposal.excecuted = true;
        }else if(proposal.yesVotes<proposal.noVotes){
            proposal.excecuted = false;
        }
    }

    function getProposalCount() public view returns(uint){
        return proposalCount;
    }

    function getProposal(uint _proposalId) public view returns(Proposal memory){
        Proposal memory proposal = ProposalData[_proposalId];
        return proposal;
    }

    function getBalance(address nftAddress) public view returns(uint){
        return IERC20(nftAddress).balanceOf(msg.sender)/10**18;
    }

    // function increaseYes(uint _proposalId,address nftAddress) public view returns(uint){
    //     Proposal memory proposal = ProposalData[_proposalId];
    //     uint voteCount = proposal.yesVotes + (IERC20(nftAddress).balanceOf(msg.sender)/10**18);
    //     proposal.yesVotes= voteCount;
    //     return proposal.yesVotes;
    // }
 
}



