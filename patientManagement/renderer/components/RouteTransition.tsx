import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { OperationContext } from '../@context/operation';

export function RouterTransition() {
  const router = useRouter();
  const {setAnchor, anchor} = useContext(OperationContext);
  const handleAnchor = (url: string) => {
    setAnchor((prev) =>[{href: url, label: url.split("/").pop()}])
  }
  const handleRemovePath = (pathToRemove) => {
    const newBreadcrumbs = anchor.filter(path => path !== pathToRemove);
    setAnchor(newBreadcrumbs);
  }
  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && nprogress.start();
    const handleComplete = () => nprogress.complete();
    handleAnchor(router.asPath);
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      handleRemovePath(router.asPath);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath, router.events]);

  return <NavigationProgress autoReset={true} />;
}