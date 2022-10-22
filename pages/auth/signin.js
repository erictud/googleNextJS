import Header from "../../components/Header";
import { getProviders } from "next-auth/react";

function signIn({ providers }) {
  return (
    <div>
      <Header />
      <div className="">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
              alt="Logo"
              width={300}
              height={150}
            />
            <p>
              This website is created for learning purposes. I do not claim ownership of google!!
            </p>
            <button>Sign in with {provider.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
