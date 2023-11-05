import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { ContextProvider } from '../components/context';
import { useSession } from 'next-auth/react';


export const metadata = {
    title: "Care One",
    description: "A Unique Approach to Emergency Care. Care at your own pace"
}

const RootLayout = ({ children }) => {

    return (

          <html lang='en'>
              <body>
              
                  <Provider>
                      <div className="main">
                          <div className="gradient" />
                      </div>
                      <main className='app'>
                          <Nav />
                          {children}
                      </main>
                  </Provider>
                
              </body>
          </html>

    )
}

export default RootLayout
