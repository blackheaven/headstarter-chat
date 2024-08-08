import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const startingPrompt = `
**Welcome to Headstarter Support!**

Hi there! I'm your Headstarter Support Assistant. Whether you're having issues, need guidance, or have questions about our interview practice platform, I'm here to help. 

How can I assist you today?

1. **Getting Started**: Need help setting up your account or navigating the platform?
2. **Interview Practice**: Have questions about scheduling, accessing, or optimizing your AI practice interviews?
3. **Technical Issues**: Encountering any bugs, errors, or other technical difficulties?
4. **Subscription & Billing**: Inquiries about your subscription, billing, or payment methods?
5. **Feedback & Suggestions**: Want to share your feedback or suggestions to improve our services?

Please provide as much detail as possible so I can assist you effectively. Let's get started on making your interview practice seamless and successful!
`;
 
type ResponseData = {
  message: string;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
   if (req.method !== 'POST') {
    res.status(400);
  }

  console.log('POST /api/chat');
  const data = await req.body;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: startingPrompt }, ...data],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);
  res.status(200).json({ message: completion.choices[0]?.message?.content || '' });
};
