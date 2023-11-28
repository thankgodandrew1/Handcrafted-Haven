import { GetServerSidePropsContext } from "next"
// import { getProviders, signIn, getCsrfToken } from "next-auth/react"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../api/auth/[...nextauth]"

export default function SignIn({ providers, csrfToken }) {
  return (
    <>
      {/* {Object.values(providers).map((provider) => ( */}
        <div>
          <button
            onClick={() => signIn(provider.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with {}
          </button>
        </div>
      
      <form method="post" action="/api/auth/signin/email">
        <input
          name="csrfToken"
          type="hidden"
          defaultValue={csrfToken}
          className="hidden"
        />
        <label className="block">
          Email address
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Email
        </button>
      </form>

      <form method="post" action="/api/auth/callback/credentials">
        <input
          name="csrfToken"
          type="hidden"
          defaultValue={csrfToken}
          className="hidden"
        />
        <label className="block">
          Username
          <input
            name="username"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          Password
          <input
            name="password"
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in
        </button>
      </form>
    </>
  )
  }

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } }
  }

  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)

  return {
    props: { providers: providers ?? [], csrfToken },
  }
}