export function getQuestEmailTemplate(title: string, questId: string, category: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quest Unlocked: ${title}</title>
    </head>

    <body style="margin:0;padding:20px;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

    <div style="max-width:440px;margin:0 auto;background:#0d0d0d;border:1px solid #1f1f1f;padding:28px 24px;box-shadow:0 20px 40px rgba(0,0,0,0.5);">

        <!-- Header -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:24px;">
            <tr>
                <td align="left" style="vertical-align:middle;">

                    <img
                        src="https://inryqnniponjlvypumkw.supabase.co/storage/v1/object/public/logo/b43a05dbb295cf917d91cc45c2d47a2bf508aada.png"
                        alt="Game Dev Club"
                        width="34"
                        height="34"
                        style="vertical-align:middle;margin-right:10px;"
                    >

                    <span style="
                        font-family:'Arial Black',sans-serif;
                        font-size:15px;
                        font-weight:900;
                        letter-spacing:1px;
                        color:#ffffff;
                        text-transform:uppercase;
                        vertical-align:middle;
                    ">
                        GAME DEV <span style="color:#FF7A00;">CLUB</span>
                    </span>

                </td>
            </tr>
        </table>

        <!-- Label -->
        <div style="
            font-family:ui-monospace,'Courier New',monospace;
            font-size:11px;
            color:#FF7A00;
            letter-spacing:1.5px;
            text-transform:uppercase;
            margin-bottom:6px;
            font-weight:bold;
        ">
            // QUEST UNLOCKED
        </div>

        <!-- Title -->
        <h1 style="
            color:#ffffff;
            font-size:24px;
            font-weight:800;
            margin-top:0;
            margin-bottom:12px;
            letter-spacing:-0.03em;
            text-transform:uppercase;
        ">
            ${title}
        </h1>

        <!-- Description -->
        <p style="
            font-size:14px;
            color:#a0a0a0;
            line-height:1.6;
            margin-top:0;
            margin-bottom:24px;
        ">
            The wait is over. This quest is now <strong>ACTIVE</strong> and open for registration. Secure your spot before it reaches capacity.
        </p>

        <!-- OTP Box / CTA -->
        <div style="
            background:#050505;
            border:1px solid #222222;
            padding:20px;
            text-align:center;
            margin-bottom:12px;
        ">
            <a href="https://gdcsctce.vercel.app/dashboard/quests?open=${questId}" style="
                font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
                font-size:16px;
                color:#ffffff;
                font-weight:700;
                letter-spacing:4px;
                text-transform:uppercase;
                text-decoration:none;
                display:block;
                line-height:1;
            ">
                VIEW DOSSIER
            </a>
        </div>

        <!-- Meta -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
            <tr>

                <td style="
                    font-family:ui-monospace,'Courier New',monospace;
                    font-size:11px;
                    color:#666666;
                    text-transform:uppercase;
                ">
                    Category:
                    <span style="color:#ffffff;font-weight:600;">
                        ${category || 'Event'}
                    </span>
                </td>

                <td align="right" style="
                    font-family:ui-monospace,'Courier New',monospace;
                    font-size:11px;
                    color:#666666;
                    text-transform:uppercase;
                ">
                    Status:
                    <span style="color:#FF7A00;font-weight:600;">
                        Active
                    </span>
                </td>

            </tr>
        </table>

        <!-- Footer -->
        <div style="
            border-top:1px solid #1f1f1f;
            padding-top:20px;
            font-family:ui-monospace,'Courier New',monospace;
            font-size:10px;
            color:#555555;
            letter-spacing:0.5px;
            text-transform:uppercase;
            line-height:1.6;
        ">
            <div style="margin-bottom:4px;font-weight:600;">
                GAME_FORGE_COLLECTIVE // SYSTEM_READY
            </div>

            <div>
                You are receiving this because you enabled notifications for this quest.
            </div>
        </div>

    </div>

    </body>
    </html>
  `;
}
