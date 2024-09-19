// SPDX-License-Identifier MIT
pragma solidity ^0.8.20;

contract CoursePlatform {
    struct Course {
        uint id;
        string name;
        string provider;
        string description;
        string imageHash; // IPFS hash for course thumbnail/image
        uint realAmount;
        uint discountedAmount;
        address payable instructor;
        string[] videoHashes; // Array of IPFS hashes for videos
    }

    struct Certificate {
        bool issued;
        string studentName;
        string courseName;
        string courseProvider;
        address studentAddress;
    }

    mapping(uint => Course) public courses;
    mapping(address => mapping(uint => bool)) public coursePurchased; // Keeps track of who purchased what course
    mapping(address => mapping(uint => bool)) public courseCompleted; // Keeps track of course completion
    mapping(address => mapping(uint => Certificate)) public certificates; // Keeps track of certificates for users

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

    event CoursePurchased(address user, uint courseId);
    event CourseCompleted(address user, uint courseId);
    event CertificateIssued(address user, uint courseId, string studentName);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier courseExists(uint courseId) {
        require(courseId > 0 && courseId <= courseCount, "Course does not exist");
        _;
    }

    constructor() {
        owner = msg.sender; // The deployer is set as the owner/admin
    }

    // Admin (owner) can create courses
    function createCourse(
        string memory _name, 
        string memory _provider,
        string memory _description,
        string memory _imageHash, // IPFS hash for the course thumbnail/image
        uint _realAmount, 
        uint _discountedAmount
    ) public onlyOwner {
        courseCount++;

        // Initialize an empty array of strings for videoHashes
        string[] memory emptyVideoHashes;

        courses[courseCount] = Course(
            courseCount, 
            _name, 
            _provider, 
            _description,
            _imageHash, // Store imageHash
            _realAmount, 
            _discountedAmount, 
            payable(msg.sender), 
            emptyVideoHashes // Correctly initializing the empty array here
        );

        emit CourseCreated(courseCount, _name, _provider, _description, _imageHash, _realAmount, _discountedAmount, msg.sender);
    }

    // Admin (owner) can add videos to a specific course by providing IPFS hashes
    function addVideoToCourse(uint _courseId, string memory _videoHash) public onlyOwner courseExists(_courseId) {
        courses[_courseId].videoHashes.push(_videoHash);
    }

    // Users can buy courses by paying the discounted amount
    function buyCourse(uint _courseId) public payable courseExists(_courseId) {
        Course memory course = courses[_courseId];
        require(msg.value >= course.discountedAmount, "Not enough ETH to purchase the course");
        require(!coursePurchased[msg.sender][_courseId], "Course already purchased");

        // Mark course as purchased
        coursePurchased[msg.sender][_courseId] = true;
        // Transfer funds to the course instructor (admin)
        course.instructor.transfer(msg.value);

        emit CoursePurchased(msg.sender, _courseId);
    }

    // Users can mark a course as completed
    function completeCourse(uint _courseId) public courseExists(_courseId) {
        require(coursePurchased[msg.sender][_courseId], "You need to buy the course first");
        require(!courseCompleted[msg.sender][_courseId], "Course already completed");

        // Mark course as completed
        courseCompleted[msg.sender][_courseId] = true;

        emit CourseCompleted(msg.sender, _courseId);
    }

    // Admin (owner) issues a certificate to the user after course completion
    function issueCertificate(
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

        certificates[msg.sender][_courseId] = certificate;

        emit CertificateIssued(msg.sender, _courseId, _studentName);
    }

    // Get video hashes for a course (Only if the course is purchased)
    function getCourseVideos(uint _courseId) public view returns (string[] memory) {
        require(coursePurchased[msg.sender][_courseId], "You need to buy the course first");
        return courses[_courseId].videoHashes;
    }

    // Get course information including image hash
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

    // Get certificate for a user after completing a course
    function getCertificate(uint _courseId) public view returns (Certificate memory) {
        require(certificates[msg.sender][_courseId].issued, "No certificate issued yet");
        return certificates[msg.sender][_courseId];
    }
}
