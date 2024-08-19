/**
 * Pattern Subscriber or Observer interface, allows to agents to being notified if some Subject have changed, sending an update with possibly some message.
 */
export default interface Observer {
    /**
     * This method allow to users to specify what and how be sent an update to the followers
     * @param message : any : Any message what an agent can send to other agent
     */
    update(message: any): any;
}
