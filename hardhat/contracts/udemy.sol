// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CoursePlatform {
    struct Video {
        string videoHash;
        string videoDescription;
    }

    struct Course {
        uint id;
        string name;
        string provider;
        string description;
        string imageHash;
        uint realAmount;
        uint discountedAmount;
        address payable instructor;
        Video[] videos; 
    }

    struct Certificate {
        bool issued;
        string studentName;
        string courseName;
        string courseProvider;
        address studentAddress;
    }

    mapping(uint => Course) public courses;
    mapping(address => mapping(uint => bool)) public coursePurchased; 
    mapping(address => mapping(uint => bool)) public courseCompleted; 
    mapping(string => mapping(uint => Certificate)) public certificatesByUserId; 

    uint public courseCount = 0;
    address public owner;

    event CourseCreated(
        uint id,
        string name,
        string provider,
        string description,
        string imageHash,
        uint realAmount,
        uint discountedAmount,
        address instructor
    );

    event VideoAdded(uint courseId, string videoHash, string videoDescription);
    event CoursePurchased(address user, uint courseId);
    event CourseCompleted(address user, uint courseId);
    event CertificateIssued(string userId, uint courseId, string studentName);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier courseExists(uint courseId) {
        require(courseId > 0 && courseId <= courseCount, "Course does not exist");
        _;
    }

    constructor() {
        owner = msg.sender; 
    }

   function getOwner() public view returns (address) {
    return owner;
}

    function createCourse(
        string memory _name, 
        string memory _provider,
        string memory _description,
        string memory _imageHash, 
        uint _realAmount, 
        uint _discountedAmount
    ) public onlyOwner {
        courseCount++;

        
        Course storage newCourse = courses[courseCount];

        newCourse.id = courseCount;
        newCourse.name = _name;
        newCourse.provider = _provider;
        newCourse.description = _description;
        newCourse.imageHash = _imageHash;
        newCourse.realAmount = _realAmount;
        newCourse.discountedAmount = _discountedAmount;
        newCourse.instructor = payable(msg.sender); 

        emit CourseCreated(courseCount, _name, _provider, _description, _imageHash, _realAmount, _discountedAmount, msg.sender);
    }

    
    function addVideoToCourse(uint _courseId, string memory _videoHash, string memory _videoDescription) public onlyOwner courseExists(_courseId) {
        Video memory newVideo = Video(_videoHash, _videoDescription);
        courses[_courseId].videos.push(newVideo);

        emit VideoAdded(_courseId, _videoHash, _videoDescription);
    }


    function buyCourse(uint _courseId) public payable courseExists(_courseId) {
        Course memory course = courses[_courseId];
        require(msg.value >= course.discountedAmount, "Not enough ETH to purchase the course");
        require(!coursePurchased[msg.sender][_courseId], "Course already purchased");

       
        coursePurchased[msg.sender][_courseId] = true;
        
        course.instructor.transfer(msg.value);

        emit CoursePurchased(msg.sender, _courseId);
    }

   
    function completeCourse(uint _courseId) public courseExists(_courseId) {
        require(coursePurchased[msg.sender][_courseId], "You need to buy the course first");
        require(!courseCompleted[msg.sender][_courseId], "Course already completed");

       
        courseCompleted[msg.sender][_courseId] = true;

        emit CourseCompleted(msg.sender, _courseId);
    }

   
    function issueCertificate(
        string memory _userId, 
        uint _courseId, 
        string memory _studentName
    ) public onlyOwner courseExists(_courseId) {
        require(courseCompleted[msg.sender][_courseId], "Course not completed by the student");

        Certificate memory certificate = Certificate({
            issued: true,
            studentName: _studentName,
            courseName: courses[_courseId].name,
            courseProvider: courses[_courseId].provider,
            studentAddress: msg.sender
        });

        certificatesByUserId[_userId][_courseId] = certificate;

        emit CertificateIssued(_userId, _courseId, _studentName);
    }

    function getCourseVideos(uint _courseId) public view returns (Video[] memory) {
        require(coursePurchased[msg.sender][_courseId], "You need to buy the course first");
        return courses[_courseId].videos;
    }

    
    function getCourse(uint _courseId) public view courseExists(_courseId) returns (
        string memory name,
        string memory provider,
        string memory description,
        string memory imageHash,
        uint realAmount,
        uint discountedAmount,
        address instructor
    ) {
        Course memory course = courses[_courseId];
        return (
            course.name,
            course.provider,
            course.description,
            course.imageHash,
            course.realAmount,
            course.discountedAmount,
            course.instructor
        );
    }

   
    function getCertificate(string memory _userId, uint _courseId) public view returns (Certificate memory) {
        require(certificatesByUserId[_userId][_courseId].issued, "No certificate issued yet");
        return certificatesByUserId[_userId][_courseId];
    }
}
