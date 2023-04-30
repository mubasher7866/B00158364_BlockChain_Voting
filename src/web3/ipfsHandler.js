import { create } from "ipfs-http-client";
import { toast } from "react-toastify";

const projectId = "2Maa4FtoPXAqZ8EfBsFNpXF37HE";
const projectSecret = "b8f960c1ccd4f2a04b25988fa5a7f54c";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

// Create an IPFS client and export it
export const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
});

// Image upload function on change of the image input field
export const uploadImage = async (e) => {
  try {
    const added = await ipfs.add(e);
    // Our uploaded image will be available with dedicated URL: eth-voting.infura-ipfs.io/ipfs/{hash}
    const url = `https://eth-voting.infura-ipfs.io/ipfs/${added.path}`;
    toast.success("Image uploaded successfully!");
    return url;
  } catch (error) {
    console.log("Error uploading file: ", error);
    toast.error("Error uploading file: ", error);
  }
};
