// Example usage:
const accountId = 'da1aad0ac536617ac4a951a39c9808a6'; 
const StatusauthorizationToken = 'WHruCQgY1JaUTP8_4IpjsnTGb8-WfljP3j3HFzTl'; 
const TurnstileAuthorizationToken = 'CD2JvcIMnZ3mE7avhXHQV58WuYPN-mtV97Bq6lkR'; 
const sitekey = '0x4AAAAAAAgiP9KssKL8h557'; 




fetchDomainNames(StatusauthorizationToken,accountId);
// Fetch API response
async function fetchDomainNames(StatusauthorizationToken,accountId) {
    let nameArray;
   
    try {
        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/zipr-saas-platform/domains`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${StatusauthorizationToken}`,// Replace with your Cloudflare API token
                'Access-Control-Allow-Origin': '*',// Origin making the request (optional, usually automatic)
            }
        }); 

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
            return;
        }

        const data = await response.json();

        // Extract the 'name' key from each object in the array
       data.result.forEach(element => {
           nameArray = [...element.map(domain => domain.name),];        
       });
        console.log(nameArray);

    } catch (error) {
        console.error('Error fetching domain names:', error);
    }
    function updateCloudflareWidget(accountId, TurnstileAuthorizationToken,sitekey,nameArray,domainname) {
        nameArray.push(domainname);

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TurnstileAuthorizationToken}`,    
               'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                bot_fight_mode: false,
                clearance_level: "interactive",
                domains: nameArray,
                ephemeral_id: false,
                mode: "invisible",
                name: "SaaS First Time User",
                offlabel: false
            })
        };
    
        fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/challenges/widgets/${sitekey}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
    updateCloudflareWidget(accountId, authorizationToken,sitekey,nameArray);
}




