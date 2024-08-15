module Recaptcha
  def verify_recaptcha
    require "net/http"

    url = URI("https://challenges.cloudflare.com/turnstile/v0/siteverify")
    req = Net::HTTP::Post.new(url.path)

    req.set_form_data({
      "secret" => Rails.application.credentials.recaptcha.secret,
      "response" => params[:recaptcha_token],
      "remoteip" => request.remote_ip
    })

    res = Net::HTTP.start(url.host, url.port, use_ssl: true) do |http|
      http.request(req)
    end

    result = JSON.parse(res.body)

    return result["success"] # CloudFlare returns true or false.
  end
end
