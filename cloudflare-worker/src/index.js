function escapeHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeSubject(value = '') {
    return String(value).replace(/[\r\n]+/g, ' ').trim();
}

export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            });
        }

        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }

        try {
            const body = await request.json();
            const { name, email, company, phone, status = 'Started Discovery Form', summary } = body;
            const subjectName = sanitizeSubject(name || 'Unknown');
            const safeName = escapeHtml(name);
            const safeEmail = escapeHtml(email);
            const safeCompany = escapeHtml(company);
            const safePhone = escapeHtml(phone);
            const safeStatus = escapeHtml(status);
            const safeSummary = summary ? escapeHtml(summary) : '';

            const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: 'SRTtrail Leads <leads@srttrail.dev>',
                    to: 's.trail7878@gmail.com',
                    subject: `New Lead Started: ${subjectName}`,
                    html: `
                        <h2>New Discovery Form Started</h2>
                        <p><strong>Status:</strong> ${safeStatus}</p>
                        <p><strong>Name:</strong> ${safeName}</p>
                        <p><strong>Email:</strong> ${safeEmail}</p>
                        <p><strong>Phone:</strong> ${safePhone}</p>
                        <p><strong>Company:</strong> ${safeCompany}</p>
                        <hr>
                        <p><em>The visitor has completed the first step of the discovery form.</em></p>
                        ${safeSummary ? `<h3>Full Discovery Answers</h3><pre>${safeSummary}</pre>` : ''}
                    `,
                    text: [
                        'New Discovery Form Started',
                        `Status: ${status}`,
                        `Name: ${name}`,
                        `Email: ${email}`,
                        `Phone: ${phone}`,
                        `Company: ${company}`,
                        '',
                        summary ? `Full Discovery Answers:\n${summary}` : ''
                    ].filter(Boolean).join('\n')
                })
            });

            if (!resendResponse.ok) {
                const resendError = await resendResponse.text();
                return new Response(JSON.stringify({
                    error: 'Failed to send email',
                    resendStatus: resendResponse.status,
                    resendBody: resendError
                }), {
                    status: 502,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                });
            }

            return new Response(JSON.stringify({ success: true }), {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            return new Response('Internal Server Error', { status: 500 });
        }
    }
};