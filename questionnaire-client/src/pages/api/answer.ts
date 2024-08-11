import { postAnswer } from "@/services/answer";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function genAnswerInfo(reqBody: any) {
    const answerList = []
    Object.keys(reqBody).forEach((key) => {
        if (key === 'questionId') return;
        answerList.push({
            componentId: key,
            value: reqBody[key]
        })
    })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    // form标签提交数据是post请求，所以这里只处理post请求
    if (req.method !== 'POST') {
        res.status(200).json({ errno: -1, msg: "请求方法错误" });
    }
    // 格式化表单数据
    const answerInfo = genAnswerInfo(req.body)

    // TODO：处理数据，将数据传输到服务端分析
    try {
        // 提交到外部系统处理 （Mock）
        const resDta = await postAnswer(answerInfo)
        if (resDta.errno === 0) {
            // 成功提交，去成功页面
            res.redirect('/success')
        } else {
            // 提交失败，去失败页面
            res.redirect('/fail')
        }
    } catch (error) {
        console.log('error', error)
        // 提交失败，去失败页面
        res.redirect('/fail')
    }
}
