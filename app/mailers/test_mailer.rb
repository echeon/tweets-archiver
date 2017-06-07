class TestMailer < ApplicationMailer
  default from: 'euibinc@gmail.com'

  def sample_email
    # xlsx = render_to_string layout: false, handlers: [:axlsx], formats: [:xlsx], template: "api/tweets/download", locals: {:@data => data}
    # attachment = Base64.encode64(xlsx)
    # attachments["test.xlsx"] = {mime_type: Mime[:xlsx], content: attachment, encoding: 'base64'}
    mail(to: 'euibinc@gmail.com', subject: 'Trying Mailer')
  end

end
