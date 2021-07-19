export const langSwitcher = (param: any): (string | undefined) => {
    switch (param) {
      case 'ko_KR':
        return '한국어'
      case 'en_US':
        return '영어'
      case 'ja_JP':
        return '일본어'
    }
  }