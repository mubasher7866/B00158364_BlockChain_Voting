export const electionABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_slogan",
        type: "string",
      },
      {
        internalType: "string",
        name: "_logoUri",
        type: "string",
      },
      {
        internalType: "string",
        name: "_mail",
        type: "string",
      },
      {
        internalType: "string",
        name: "_address",
        type: "string",
      },
    ],
    name: "addParty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ppsn",
        type: "string",
      },
      {
        internalType: "uint128",
        name: "_dob",
        type: "uint128",
      },
      {
        internalType: "string",
        name: "_address",
        type: "string",
      },
      {
        internalType: "string",
        name: "photo",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
    ],
    name: "addVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_voterAddress",
        type: "address",
      },
    ],
    name: "checkVerification",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endElection",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getElectionDetails",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumOfParties",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumOfVoters",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
    ],
    name: "getVoterDetails",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "ppsnNumber",
            type: "string",
          },
          {
            internalType: "uint128",
            name: "dob",
            type: "uint128",
          },
          {
            internalType: "string",
            name: "residentialAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "photoUri",
            type: "string",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "address",
            name: "wallet",
            type: "address",
          },
          {
            internalType: "bool",
            name: "verified",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "voted",
            type: "bool",
          },
        ],
        internalType: "struct election.Voter",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "isRegistered",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "parties",
    outputs: [
      {
        internalType: "string",
        name: "partyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "partySlogan",
        type: "string",
      },
      {
        internalType: "string",
        name: "logoUri",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "voteCount",
        type: "uint16",
      },
      {
        internalType: "string",
        name: "contactEmail",
        type: "string",
      },
      {
        internalType: "string",
        name: "officeAddress",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "assetURI",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_voterId",
        type: "uint8",
      },
    ],
    name: "uploadVerification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
    ],
    name: "verifyVoter",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_partyId",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_voterId",
        type: "uint8",
      },
    ],
    name: "vote",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "winnerDetails",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "partyName",
            type: "string",
          },
          {
            internalType: "string",
            name: "partySlogan",
            type: "string",
          },
          {
            internalType: "string",
            name: "logoUri",
            type: "string",
          },
          {
            internalType: "uint16",
            name: "voteCount",
            type: "uint16",
          },
          {
            internalType: "string",
            name: "contactEmail",
            type: "string",
          },
          {
            internalType: "string",
            name: "officeAddress",
            type: "string",
          },
        ],
        internalType: "struct election.politicalParty",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
