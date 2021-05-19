pragma solidity ^0.4.17;

contract CrowdfundingFactory {
    address[] private liveCampaigns;
    
    function createRegistration(uint minimum) public {
        address registration = new Crowdfunding(minimum);
        liveCampaigns.push(registration);
    }
    
    function getRegistrations() public view returns (address[]) {
        return liveCampaigns;
    }
}

contract Crowdfunding {
    modifier owner() {
        require(msg.sender == manager);
        _;
    }

    struct PatientDetails {
        string PatientName;
        uint RequiredMoney;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    address public manager;
    uint public approversCount;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    PatientDetails[] public requests;
    uint  currentbalance = 0;

    // contstructor function setting minimum amount to contribute
    constructor(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    // if you're looking to donate, this is your call
    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;
        approversCount++;
    }
    
     uint256 public numPatients;
     mapping (uint256 => PatientDetails) public patient; 
      
    // request has some basic fields describing what is owner trying to purchase: 
    // "ex new laptops for developers", how much is he asking for, and who is the recipient
    function requestMoney(string memory PatientName, uint256 value, address recipient) public  {
          PatientDetails storage newPatient = patient[++numPatients];
          newPatient.PatientName = PatientName;
          newPatient.RequiredMoney = value;
          newPatient.recipient = recipient;
          newPatient.complete = false;
          newPatient.approvalCount = 0;
          
          requests.push(newPatient);
    }
    
    // this is a way for a contributor to inspect the request and say
    // "Yes, you can spend my money towards that!"
    function approveRequest(uint requestId) public {
        PatientDetails storage request = patient[requestId];
        
        // check if approver has already voted
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
        if(request.approvalCount > (approversCount / 2)){
            finalizeRequest(requestId);
        }
    }
    
    // When there are enough votes, the owner can trigger the
    // finalization of the request, and proceed with his work
    function finalizeRequest(uint requestId) public payable {
        PatientDetails storage request = patient[requestId];
        
        require(!request.complete);
        
        require(request.approvalCount > (approversCount / 2));
        
        request.recipient.call(request.RequiredMoney);
        request.complete = true; 
        
    }

    // Returns all info about the campaign, useful for displaying
    // the data for frontend application
    function getAllDetails() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

}
