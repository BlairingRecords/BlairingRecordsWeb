import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const {
      beatId,
      licenseId,
      signature,
      fullName,
      email
    } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store agreement in database
    const { data: agreement, error: insertError } = await supabase
      .from('agreements')
      .insert({
        beat_id: beatId,
        license_id: licenseId,
        signature,
        full_name: fullName,
        email,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // Send email with agreement
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Blairing Records <licensing@blairingrecords.com>',
        to: [email, 'legal@blairingrecords.com'],
        subject: 'Your Blairing Records License Agreement',
        html: `
          <h1>License Agreement</h1>
          <p>Thank you for purchasing from Blairing Records!</p>
          <p>Attached is your signed license agreement.</p>
          <p>Beat ID: ${beatId}</p>
          <p>License Type: ${licenseId}</p>
          <p>Signed by: ${fullName}</p>
          <img src="${signature}" alt="Signature" />
        `
      })
    });

    if (!emailResponse.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(
      JSON.stringify({ agreementId: agreement.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});