const factoryABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "addAuthorityWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			}
		],
		"name": "createElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "_authorityWallets",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getActiveElections",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "deployedAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "electionName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "electionDesc",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "authorityAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					}
				],
				"internalType": "struct votingFactory.electionDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllElections",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "deployedAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "electionName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "electionDesc",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "authorityAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					}
				],
				"internalType": "struct votingFactory.electionDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "id",
				"type": "uint8"
			}
		],
		"name": "getElection",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "deployedAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "electionName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "electionDesc",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "authorityAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					}
				],
				"internalType": "struct votingFactory.electionDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default factoryABI;