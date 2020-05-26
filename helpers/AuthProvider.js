// import React, {useState} from "react";

// // first we will make a new context
// const AuthContext = React.createContext();

// // Then create a provider Component
// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState("");



//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // then make a consumer which will surface it
// const AuthConsumer = AuthContext.Consumer;

// export default AuthProvider;
// export { AuthConsumer };

import { createContext } from 'react';

const AuthContext = createContext();

export default AuthContext;