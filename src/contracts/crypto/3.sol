// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract CryptoContract {
    struct UserRequest {
        string StudentName;
        address userAddress;
        uint amount;
        address payable[] nAddress;
        bool completed;
        uint deadLine;
        string IpfsAdharLink;
        string[] IpfsNAdharLink;
    }
   
    struct ClaimRequests {
        address nAddress;
        address userAddress;
        string note;
        string IpfsClaimLink;
        bool processed;
        bool isApproved;
    }

    struct ClaimTeacher {
        address TAddress;
        string TName;
        string TAdharNo;
    }

    mapping(address => UserRequest) public Repository;
    ClaimRequests[] public claimRepository;
    address[] public userRepository;
    ClaimTeacher[] public ClaimTeachers;
    address public contractOwner;

    event printLog(string message);

    constructor(address contractOwnerAddress) {
        contractOwner = contractOwnerAddress;
    }

    modifier restrictedteacher() {
        for (uint i = 0; i < ClaimTeachers.length; i++) {
            if (ClaimTeachers[i].TAddress == msg.sender) {
                _;
                break;
            }
        }
    }

    modifier restrictedContractOwner() {
        require(msg.sender == contractOwner, "You are not contract owner");
        _;
    }

    function getTotalCollection() public view returns (uint) {
        return address(this).balance;
    }

    function get(
        address userAddress
    ) public view returns (UserRequest memory) {
        return Repository[userAddress];
    }

    function getClaimRepository() public view returns (ClaimRequests[] memory) {
        return claimRepository;
    }

    function getClaimRepositoryLength() public view returns (uint) {
        return claimRepository.length;
    }

    function getUserRepository() public view returns (address[] memory) {
        return userRepository;
    }

    function getClaimTeachers() public view returns (ClaimTeacher[] memory) {
        return ClaimTeachers;
    }

    function getClaimTeacherLength() public view returns (uint) {
        return ClaimTeachers.length;
    }

    function addTeacher(
        address TeacherAddressArg,
        string memory TeacherNameArg,
        string memory TeacherAdharArg
    ) public restrictedContractOwner {
        bool flag = false;
        for (uint i = 0; i < ClaimTeachers.length; i++) {
            //i.e. user already exists
            if (ClaimTeachers[i].TAddress == TeacherAddressArg) {
                flag = true;
                break;
            }
        }
        require(flag == false, "Teacher already exists");
        ClaimTeacher memory newTeacher = ClaimTeacher({
            TAddress: TeacherAddressArg,
            TName: TeacherNameArg,
            TAdharNo: TeacherAdharArg
        });
        ClaimTeachers.push(newTeacher);
    }

    function addWill(
        string memory StudentNameArg,
        string memory IpfsAdharLinkArg,
        string[] memory IpfsNAdharLinkArg,
        address payable[] memory TeacherArg
    ) public payable {
        require(
            Repository[msg.sender].userAddress == address(0),
            "already created"
        );
        require(msg.value > 0, "value should be grater than 0");
        UserRequest memory user = UserRequest({
            StudentName: StudentNameArg,
            userAddress: msg.sender,
            amount: msg.value,
            completed: false,
            nAddress: TeacherArg,
            deadLine: 0,
            IpfsAdharLink: IpfsAdharLinkArg,
            IpfsNAdharLink: IpfsNAdharLinkArg
        });

        Repository[msg.sender] = user;
        userRepository.push(msg.sender);
        emit printLog("New user successfully added");
    }

    //add deadline in seconds
    function addDuration(
        string memory StudentNameArg,
        string memory IpfsAdharLinkArg,
        string[] memory IpfsNAdharLinkArg,
        address payable[] memory TeacherArg,
        uint deadLineArg
    ) public payable {
        require(
            Repository[msg.sender].userAddress == address(0),
            "already created"
        );
        require(msg.value > 0, "value should be grater than 0");
        UserRequest memory user = UserRequest({
            StudentName: StudentNameArg,
            userAddress: msg.sender,
            amount: msg.value,
            completed: false,
            nAddress: TeacherArg,
            deadLine: deadLineArg + block.timestamp,
            IpfsAdharLink: IpfsAdharLinkArg,
            IpfsNAdharLink: IpfsNAdharLinkArg
        });
        Repository[msg.sender] = user;
        userRepository.push(msg.sender);
        emit printLog("New user 'will' successfully added");
    }

   
    function executeThroughTeacher(
        address userAddress,
        string memory noteArg,
        bool isApproved,
        uint i
    ) public payable restrictedteacher {
        claimRepository[i].note = noteArg;
        claimRepository[i].isApproved = isApproved;
        Repository[userAddress].completed = isApproved;
        if (isApproved == true) {
            uint nAddressLength = Repository[
                claimRepository[i].userAddress
            ].nAddress.length;
            uint totalAmount = Repository[userAddress].amount /
                nAddressLength;

            //transfering assets to all nominees
            for (uint j = 0; j < nAddressLength; j++) {
                Repository[userAddress].nAddress[j].transfer(
                    totalAmount
                );
            }
            emit printLog("executed through Teacher");
        } else {
            emit printLog("Teacher decline the execution");
        }

        claimRepository[i].processed = true;
    }

    function claimRequest(
        address userAddress,
        string memory IpfsClaimLink
    ) public {
        ClaimRequests memory newRequest = ClaimRequests(
            msg.sender,
            userAddress,
            " ",
            IpfsClaimLink,
            false,
            false
        );
        claimRepository.push(newRequest);
        emit printLog("new claim request added");
    }

   
}

