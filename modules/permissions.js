module.exports = async (client, message) => {
    const modRoles = client.moderatorRoles.get(message.guild.id)
    
    if(message.member.hasPermission(`ADMINISTRATOR`)) return true;

    if(message.member.roles.cache.get(modRoles)) return true;

    if(!message.member.hasPermission(`ADMINISTRATOR`) && !message.member.roles.cache.get(modRoles)) return false
    
}