// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract CryptoDataContract {

     struct UserData{
        string StudentName;
        address UserAddress;
        uint amount;
        address payable[] StudentAddress;
        bool completed;
        uint deadLine;
        string IpfsAdharLink;
        string[] IpfsStudentAdharLink;
    }
   
    
 struct DataRequests {
        address StudentAddress;
        address userAddress;
        string note;
        string IpfsDataLink;
        bool processed;
        bool isApproved;
    }
  

      mapping(address => UserData) public DataRepository;
    DataRequests[] public DataRepository;
    address[] public userRepository;
    address[] public claimTeachers;
    address public contractOwner;

    event printLog(string message);

    constructor(address contractOwnerAddress) {
        contractOwner = contractOwnerAddress;
    }

    modifier restrictedTeacher() {
        for (uint i = 0; i < claimTeacher.length; i++) {
            if (claimTeacher[i] == msg.sender) {
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

    function getData(address userAddress) public view returns(UserData memory) {
        return DataRepository[userAddress];
    }

    function getDataRepository() public view returns(DataRequests[] memory) {
        return DataRepository;
    }

    function getDataRepositoryLength() public view returns(uint) {
        return DataRepository.length;
    }

    function getUserRepository() public view returns(address[] memory) {
        return userRepository;
    }

    function getClaimTeacher() public view returns(address[] memory) {
        return claimTeacher;
    }

    function getClaimTeacherLength() public view returns(uint) {
        return claimTeacher.length;
    }

    function addTeacher(address TeacherAddress) public restrictedContractOwner {
        bool flag = false;
        for(uint i = 0; i < claimTeacher.length; i++) {
            //i.e. user already exists
            if(claimTeacher[i] == TeacherAddress){
                flag = true;
                break;
            }
        }
        require(flag == false, "Teacher already exists");
        claimTeacher.push(TeacherAddress);
    }

    function addData(
        string memory StudentNameArg,
        string memory IpfsAdharLinkArg,
        string[] memory IpfsUserAdharLinkArg,
        address payable[] memory UserAddressArg
    ) public payable {
        require(DataRepository[msg.sender].userAddress == address(0), "Data already created");
        require(msg.value > 0, "value should be grater than 0");
        UserData memory user = UserData({
            StudentName: StudentNameArg,
            userAddress: msg.sender,
            amount: msg.value,
            completed: false,
            UserAddress: UserAddressArg,
            deadLine: 0,
            IpfsAdharLink: IpfsAdharLinkArg,
            IpfsUserAdharLink : IpfsUserAdharLinkArg
        });

        DataRepository[msg.sender] = user;
        userRepository.push(msg.sender);
        emit printLog("New user 'Data' successfully added");
    }

    //add deadline in seconds
    function addDataWithDuration(
        string memory StudentNameArg,
        string memory IpfsAdharLinkArg,
        string[] memory IpfsUserAdharLinkArg,
        address payable[] memory UserAddressArg,
        uint deadLineArg
    ) public payable {
        require(DataRepository[msg.sender].userAddress == address(0), "Data already created");
        require(msg.value > 0, "value should be grater than 0");
        UserData memory user = UserData({
           StudentName: StudentNameArg,
            userAddress: msg.sender,
            amount: msg.value,
            completed: false,
            UserAddress: UserAddressArg,
            deadLine: deadLineArg + block.timestamp,
            IpfsAdharLink: IpfsAdharLinkArg,
            IpfsUserAdharLink: IpfsUserAdharLinkArg
        });
        DataRepository[msg.sender] = user;
        userRepository.push(msg.sender);
        emit printLog("New user 'Data' successfully added");
    }

   
    function executeDataThroughTeacher(
        address userAddress,
        string memory noteArg,
        bool isApproved,
        uint i
    ) public payable restrictedTeacher {
        DataRepository[i].note = noteArg;
        DataRepository[i].isApproved = isApproved;
        DataRepositary[userAddress].completed = isApproved;
        if (isApproved == true) {
            uint UserAddressLength = DataRepositary[DataRepository[i].userAddress]
                .UserAddress.length;
            uint totalAmount = DataRepositary[userAddress].amount / UserAddressLength;

            //transfering assets to all users
            for (uint j = 0; j < UserAddressLength; j++) {
                DataRepositary[userAddress].UserAddress[j].transfer(
                    totalAmount
                );
            }
            emit printLog("Data executed through officer");
        } else {
            emit printLog("officer decline the execution");
        }

        DataRepository[i].processed = true;
    }

    function DataRequest(
        address userAddress,
        string memory IpfsDataLink
    ) public {
        DataRequests memory newRequest = DataRequests(
            msg.sender,
            userAddress,
            " ",
            IpfsDataLink,
            false,
            false
        );
        DataRepository.push(newRequest);
        emit printLog("new claim request added");
    }

    function revokeContract(address payable userAddress) public {
        require(DataRepositary[msg.sender].amount > 0, "Data already executed");
        userAddress.transfer(DataRepositary[msg.sender].amount);
        DataRepository[msg.sender].completed = true;
        emit printLog("user revoked his Data");
    }
}

//contract address = 0xf80654F061d9bC796B1671b7eA21C3b4377Fd489