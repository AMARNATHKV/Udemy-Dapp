# Udemy Clone DApp - README

## 👩‍💻 Overview

This decentralized application (dApp) is a Udemy clone built on the Ethereum blockchain. It allows users to purchase courses, view course videos, complete courses, and receive certificates, all using their MetaMask wallet. Course data is stored in a decentralized manner, and certificates are issued via smart contracts, ensuring a secure, transparent, and decentralized learning experience.

## 📝 Key Features

1. **Course Purchase**: Users can browse available courses and purchase them using Ethereum.
2. **Course Video Page**: Displays all videos for the purchased course, organized in a grid layout.
3. **Course Completion**: After watching all videos, users can mark the course as completed and receive a certificate.
4. **User Authentication**: 
   - MetaMask integration for wallet authentication and transactions.
   - Stores user-specific data like username and course progress.
5. **Certificate Issuance**: After course completion, a certificate with the user's name and course details is generated via a smart contract.

## 🛠️ Tech Stack

### 💻 Frontend
- **React**: Frontend UI and state management.
- **Vite**: Fast development build and bundling tool.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Ethers.js**: Ethereum library for interacting with the blockchain.
- **MetaMask**: Wallet for authentication and transaction signing.

### ⚙️ Backend
- **Solidity**: Smart contracts for managing courses, purchases, and certificates.
- **Ethereum**: Blockchain for smart contract deployment and transaction handling.
- **Hardhat**: Ethereum development environment for compiling, testing, and deploying smart contracts.
- **IPFS**: For decentralized video storage (can be integrated with services like Pinata).

## 📝 Smart Contracts

The smart contracts provide functionality for:
1. **Course Management**: Create courses, add videos, and store course metadata (title, description, price, etc.).
2. **Course Purchase**: Allow users to purchase courses using Ethereum.
3. **Course Completion**: Track course completion for each user.
4. **Certificate Issuance**: Automatically generate a certificate for the user upon course completion.

## Prerequisites

Before running the project, ensure that you have the following set up:

- **Node.js**: Install from [Node.js official site](https://nodejs.org/).
- **MetaMask**: Download and install the MetaMask browser extension.
- **Infura Account**: Set up an account on [Infura](https://infura.io/) to connect to Ethereum networks.
- **Pinata Account (Optional)**: Register for [Pinata](https://pinata.cloud/) for IPFS file storage.

## Installation

### 1. Clone the Repository:
      
      git clone https://github.com/your-repo/udemy-clone-dapp.git

### 2. Install Dependencies:
   
       npm install
### 3. Set Environment Variables:

In the root directory, create a .env file:

    ```bash
     INFURA_SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
     ACCOUNT_PRIVATE_KEY=YOUR_PRIVATE_KEY

In the ui folder, create a .env file for IPFS or Pinata (if needed):

PINATA_API_KEY=your_api_key
PINATA_SECRET_API_KEY=your_secret_api_key

### 4. Run the Frontend:

Navigate to the ui folder and start the development server:

   
    Copy code
    cd ui
    npm run dev

### Usage
Buy Courses: Connect your MetaMask wallet, browse courses, and purchase the desired course using Ethereum.
View Course Videos: After purchasing, navigate to the course video page to view all the course content.
Complete Course: Once all videos are watched, mark the course as completed and claim your certificate.
Receive Certificate: The admin issues a blockchain-based certificate with the user's name upon course completion.

## 🎗️ Contributing
Contributions are welcome! Feel free to fork the project and submit a pull request. Follow these steps to contribute:

Fork the Project.
Create a Feature Branch (git checkout -b feature/<feature_name>).
Commit your changes (git commit -m 'Add <feature_name>').
Push to the branch (git push origin feature/<feature_name>).
Open a Pull Request.
📝 License
This project is licensed under the MIT License. See the LICENSE file for more details.
