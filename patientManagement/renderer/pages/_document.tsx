import Document, { Html, Head, Main, NextScript } from 'next/document';
import LoaderPage from '../components/page/Loader';

class MyDocument extends Document {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:true
        };
    }
  render() {
    
    setTimeout(() => {
        this.setState({isLoading: false});
    }, 5000); // Adjust the timeout value as needed
    
    return (
      <Html>
        <Head>
          {/* Preload the splash screen assets */}
          {/* <link rel="preload" href="/splashscreen.css" as="style" /> */}
          {/* <link rel="preload" href="../../public/images/GPQ_Clinic_Anim.svg" as="image" /> */}
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;