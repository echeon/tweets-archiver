
task :send_email do
  TestMailer.sample_email.deliver_now
end
