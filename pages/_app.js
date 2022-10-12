import { ThemeProvider } from '@material-tailwind/react'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../auth/AuthContext';
import { Layout } from '../components/Layout/Layout';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
		<AuthProvider>
			<ThemeProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
				<Toaster />
			</ThemeProvider>
		</AuthProvider>
  );
}

export default MyApp
