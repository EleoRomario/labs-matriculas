import { ThemeProvider } from '@material-tailwind/react'
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../auth/AuthContext';
import { Layout } from '../components/Layout/Layout';
import { RouteProtected } from '../router/RouteProtected';
import '../styles/globals.css'

const noAuthRequired = ["/","/auth/alumno","/auth/admin"];

function MyApp({ Component, pageProps }) {

	const router = useRouter();

  return (
		<AuthProvider>
			<ThemeProvider>
				<Layout>
					{noAuthRequired.includes(router.pathname) ? (
						<Component {...pageProps} />
					) : (
						<RouteProtected>
							<Component {...pageProps} />
						</RouteProtected>
					)}
				</Layout>
				<Toaster />
			</ThemeProvider>
		</AuthProvider>
  );
}

export default MyApp
