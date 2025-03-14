import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const { signOut } = useAuthenticator();
  const [myToken, setMyToken] = useState("");
  const [xeroToken, setXeroToken] = useState("");
  
  useEffect(() => {
    setMyToken(window.localStorage.getItem("CognitoIdentityServiceProvider.3j91ble2u7jm28ul214k0esaa5.c43864d8-3031-700b-dd41-96bcf99c965c.accessToken") ?? "");
  }, []);

  function GetXeroToken() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + myToken);
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
      mode: "cors" as RequestMode,
      credentials: "include" as RequestCredentials
    };
    
    fetch("https://d7evg95uyk.execute-api.us-east-1.amazonaws.com/Prod/token", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((result) => setXeroToken(result))
      .catch((error) => setXeroToken(error));
  }

  return (
    <main>      
      <h1>My Access Token</h1>
      <textarea readOnly value={myToken} />
      <button onClick={GetXeroToken}>Get Xero Access Token</button>            
      <textarea readOnly value={xeroToken} />
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
