import { useEffect } from 'react';

const shareKakao = () => {
  const { Kakao } = window;
  const serviceUrl = 'https://memorymingle.shop';

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init('013c68b5e23a4861bda99ea06e07d61b');
  }, []);

  const kakaoShareHandler = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Memory Mingle에 초대되셨어요!',
        description: '우리만의 추억 앨범을 만들고 친구와 함께 공유해보세요!',
        imageUrl:
          'https://github.com/MemoryMingle/FE/assets/135217349/9d3f87d0-c1a7-411f-882e-0a3eb1430bc8',
        link: {
          mobileWebUrl: serviceUrl,
          webUrl: serviceUrl,
        },
      },
      buttons: [
        {
          title: '추억 만들러 가기',
          link: {
            mobileWebUrl: serviceUrl,
            webUrl: serviceUrl,
          },
        },
      ],
    });
  };
  return kakaoShareHandler;
};

export default shareKakao;
