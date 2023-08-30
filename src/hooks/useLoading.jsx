import { useRecoilState } from 'recoil';
import { loadingState } from '../recoil/Atom';

const useLoading = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);

  return { isLoading, startLoading, endLoading };
};

export default useLoading;
