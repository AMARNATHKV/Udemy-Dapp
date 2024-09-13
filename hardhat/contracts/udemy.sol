// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract CoursePlatform {
    struct Course {
        uint id;
        string name;
        string provider;
        uint realAmount;        
        uint discountedAmount;
        address payable instructor;
    }

    mapping(uint => Course) public courses;
    uint public courseCount = 0;

    address public owner;
    mapping(address => bool) public admin;

    event CourseCreated(
        uint id,
        string name,
        string provider,
        uint realAmount,
        uint discountedAmount,
        address instructor
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyAdmin() {
        require(admin[msg.sender], "Not an admin");
        _;
    }

    constructor() {
        owner = msg.sender; 
        admin[msg.sender] = true; 
    }

    // Admins can create courses
    function createCourse(
        string memory _name, 
        string memory _provider,
        uint _realAmount, 
        uint _discountedAmount
    ) public onlyAdmin {
        courseCount++;
        courses[courseCount] = Course(
            courseCount, 
            _name, 
            _provider, 
            _realAmount, 
            _discountedAmount, 
            payable(msg.sender)
        );

        emit CourseCreated(courseCount, _name, _provider, _realAmount, _discountedAmount, msg.sender);
    }
}
