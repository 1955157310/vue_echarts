const axios = require('axios');

// GPT API密钥
const gptApiKey = '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';

// GPT API的URL
const gptApiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// 要生成文本的函数
async function generateText(prompt) {
  try {
    const response = await axios.post(gptApiUrl, {
      prompt: prompt,
      max_tokens: 100,  // 生成的最大标记数量
      temperature: 0.7, // 控制生成的多样性，值越大越随机，值越小越确定性
      n: 1,            // 生成多少个响应
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gptApiKey}`,
      },
    });

    // 获取生成的文本结果
    const text = response.data.choices[0].text.trim();

    return text;
  } catch (error) {
    console.error('生成文本时发生错误:', error);
    throw error;
  }
}

// 示例使用
async function main() {
  const prompt = '在这里输入你的生成文本的提示';

  try {
    const generatedText = await generateText(prompt);
    console.log('生成的文本:', generatedText);
  } catch (error) {
    console.error('发生错误:', error);
  }
}

// 运行示例
main();
