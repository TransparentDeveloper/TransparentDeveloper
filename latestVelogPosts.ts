const axios = require('axios'); // axios 모듈을 가져온다.
const xml2js = require('xml2js'); // XML을 JavaScript 객체로 변환하기 위해 xml2js 모듈을 가져온다.
const fs = require('fs'); // 파일 시스템 접근을 위해 fs 모듈을 가져온다.

const RSS_URL = 'https://v2.velog.io/rss/sksmsdbstlsdlek'; // RSS 피드 URL을 정의한다.

(async () => {
  try {
    // RSS 피드를 가져오기 위해 axios를 사용하여 GET 요청을 보낸다.
    const response = await axios.get(RSS_URL, {
      headers: {
        // 요청 헤더를 설정한다.
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml; q=0.9, */*; q=0.8'
      }
    });

    const data = response.data; // 응답 데이터 (RSS 피드 XML)를 가져온다.
    const parser = new xml2js.Parser(); // XML 파서를 생성한다.
    const result = await parser.parseStringPromise(data); // XML을 JavaScript 객체로 변환한다.
    const items = result.rss.channel[0].item; // RSS 피드 항목을 가져온다.
    const latestPosts = items.slice(0, 4); // 최신 포스트 4개를 선택한다.

    // README에 추가할 내용을 생성한다.
    let content = `\n`;
    latestPosts.forEach((post, index) => {
      // 각 포스트의 제목과 링크를 <a> 태그로 감싸고 새 창에서 열리도록 한다.
      content += `${index + 1}. <a href="${post.link[0]}" target="_blank">${post.title[0]}</a>\n`;
    });

    const readmeContent = fs.readFileSync('README.md', 'utf8'); // 기존 README.md 파일의 내용을 읽어온다.
    // 기존 주석 태그 사이의 내용을 새로운 내용으로 교체한다.
    const updatedReadmeContent = readmeContent.replace(
      /<!-- VelogPostsStart -->[\s\S]*<!-- VelogPostsEnd -->/,
      `<!-- VelogPostsStart -->\n${content}\n<!-- VelogPostsEnd -->`
    );

    // README.md 파일의 내용이 변경된 경우에만 파일을 업데이트한다.
    if (updatedReadmeContent !== readmeContent) {
      console.log("Updating README.md with new content."); // 업데이트 메시지를 출력한다.
      fs.writeFileSync('README.md', updatedReadmeContent); // 새로운 내용을 README.md 파일에 쓴다.
    } else {
      console.log("No updates to README.md needed."); // 업데이트가 필요하지 않음을 출력한다.
    }
  } catch (error) {
    console.error('Error fetching RSS feed:', error); // RSS 피드를 가져오는 도중 발생한 오류를 출력한다.
  }
})();
