# CL account generation (Demo app)

Generally it is a CRUD app to store emails, proxy and accounts data. Also it can create accounts on the Сoinlist platform using Selenium and make some automation tasks.

But due to the fact that this is a demo application, I have not included the automation files here, as they are very complex and I would not like to share them publicly.


App server have CRUD REST API for emails, proxy and accounts. When you create account app get free email and proxy, and change their status. 

## App pages:

Main function is creation of new account, server use Selenium to run the browser, create account, verify email, create entity on CL exchange, fill a lot of forms and get verification link from QR code. 

For this you need email and proxy, witch you can add on related pages. 

![Accounts page](/git-images/2022-03-03_150112.png)

![Create accpunt page](/git-images/2022-03-03_150128.png)

![Add proxy page](/git-images/2022-03-03_150025.png)

![Proxy page](/git-images/2022-03-03_150010.png)

![Emails page](/git-images/2022-03-03_150049.png)
