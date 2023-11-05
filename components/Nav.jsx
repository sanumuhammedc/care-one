"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";


const Nav = () => {

  const { data: session } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
      setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center" >
        <Image src="/assets/images/logo.png" width={30} height={30} alt="care one Logo" className="object-contain" />
        <p className="logo_text">Care One</p>
      </Link>
      {/* Desktop navigation */}
      <div className="sm:flex hidden " >
        {session?.user ? (
          <div className="flex gap-3 md:gap-5" >
            <Link href="/dashboard" className="black_btn">
              Dashboard
            </Link>
            <button type="button" onClick={()=>{
              signOut()
              router.refresh()
              router.push("/")
              }} 
              className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image src={session?.user.image} width={37} height={37} alt="Profile" className="rounded-full" />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button type="button " key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign in with {provider.name}
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex" >
            <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" onClick={() => setToggleDropdown((prev) => !prev)} />

            {toggleDropdown && (
              <div className="dropdown ">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>

                <Link href="/dashboard" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  Dashboard
                </Link>

                <button 
                type="button" 
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                  router.refresh()
                  router.push("/")
                }} 
                className="mt-5 w-full black_btn" 
                >
                  Sign Out
                </button>
              </div>
            )}

          </div>
        ) :
          (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button type="button " key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                    Sign in with {provider.name}
                  </button>
                ))
              }
            </>
          )
        }
      </div>

    </nav>
  )
}

export default Nav