
task :send_email => :environment do
  TestMailer.sample_email.deliver_now
end
