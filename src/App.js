import React, { useEffect, useState } from "react";
import SimpleBarReact from "simplebar-react";
import "./App.css";
import Routers from "./routes/Router.js";
import { Toaster } from "react-hot-toast";
import Progress from "./components/AddedComponents/ProgressBar.jsx";
import axios from "axios";
import { maintainace } from "./baseurl/baseurl.js";
import { decryption } from "./functions/crypto.js";

function App() {
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const response = await axios.get(maintainace);
        console.log("response for maintainance iamsun", response);
        if (response.data) {
          const decryptedData = decryption(response.data);
          console.log("response for decryptedData iamsun", decryptedData);
          if (decryptedData.state) {
            // setIsMaintenance(true);
          }
        }
      } catch (error) {
        console.error("Error checking maintenance status:", error);
      }
    };

    checkMaintenance();
  }, []);

  if (isMaintenance) {
    window.location.href = "https://maintenance.riskwisepro.io/";
    return null;
  }

  return (
    <SimpleBarReact className="bgHome">
      {/* <SimpleBarReact className="h-screen simplebar-scrollbar"> */}
      <Routers />
      <Progress /> {/* Display pgrogress bar when page reloads */}
      <Toaster position="bottom-right" reverseOrder={false} />
    </SimpleBarReact>
  );
}

export default App;
