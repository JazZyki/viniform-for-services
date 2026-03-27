import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file'); // ZIP soubor
        const spz = formData.get('spz');
        const customer = formData.get('customer');
        const technicianEmail = 'wp.zykl@gmail.com'; // Přednastavený mail
        const ccEmail = formData.get('ccEmail'); // Kopie

        // Převedeme soubor na Buffer pro přílohu
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const data = await resend.emails.send({
            from: 'VIniform4Services <onboarding@resend.dev>', // Později nahradíš svou doménou
            to: [technicianEmail],
            cc: ccEmail ? [ccEmail] : [],
            subject: `Nová zakázka: ${spz} - ${customer}`,
            text: `V příloze naleznete dokumentaci k zakázce SPZ: ${spz}.`,
            attachments: [
                {
                    filename: `${spz}_dokumentace.zip`,
                    content: buffer,
                },
            ],
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}