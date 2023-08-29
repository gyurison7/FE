import { useEffect } from 'react';

const shareKakao = () => {
  const { Kakao } = window;
  const serviceUrl = "https://memorymingle.shop"

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init('013c68b5e23a4861bda99ea06e07d61b');
  }, []);

  const kakaoShareHandler = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Memory Mingle',
        description: 'Memory Mingle에 초대되셨어요!',
        imageUrl:
          'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: serviceUrl,
          webUrl: serviceUrl,
        },
      },
      buttons: [
        {
          title: '참여하기',
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
