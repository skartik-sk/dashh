module dashh_add::dashh1 {
    use std::string::{String, utf8};
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};

    // Error codes
    const E_CAMPAIGN_EXISTS: u64 = 1;
    const E_CAMPAIGN_NOT_FOUND: u64 = 2;
    const E_NOT_OWNER: u64 = 3;
    const E_CAMPAIGN_ENDED: u64 = 4;

    // Structs
    struct Campaign has store {
        id: u64,
        title: String,
        image: String,
        description: String,
        label: String,
        endtime: u64,
        reward: u64,
        owner: address,
    }

    struct Participant has store {
        id: u64,
        user: address,
        points: u64,
    }

    // Resource to store all campaigns and participants
    struct CampaignStore has key {
        campaigns: Table<u64, Campaign>,
        participants: Table<address, Participant>,
        campaign_count: u64,
    }

    // Initialize function
    fun init_module(account: &signer) {
        move_to(account, CampaignStore {
            campaigns: table::new(),
            participants: table::new(),
            campaign_count: 0,
        });
    }

    // Create campaign
    public entry fun create_campaign(
        account: &signer,
        campaign_id: u64,
        title: String,
        image: String,
        description: String,
        label: String,
        endtime: u64,
        reward: u64
    ) acquires CampaignStore {
        let signer_addr = std::signer::address_of(account);
        let campaign_store = borrow_global_mut<CampaignStore>(@dashh_add);
        
        assert!(!table::contains(&campaign_store.campaigns, campaign_id), E_CAMPAIGN_EXISTS);

        let campaign = Campaign {
            id: campaign_id,
            title: title,
            image: image,
            description: description,
            label: label,
            endtime: endtime,
            reward: reward,
            owner: signer_addr,
        };

        table::add(&mut campaign_store.campaigns, campaign_id, campaign);
        campaign_store.campaign_count = campaign_store.campaign_count + 1;
    }

    // Create participant
    public entry fun create_participant(
        account: &signer,
        campaign_id: u64
    ) acquires CampaignStore {
        let signer_addr = std::signer::address_of(account);
        let campaign_store = borrow_global_mut<CampaignStore>(@dashh_add);
        
        assert!(table::contains(&campaign_store.campaigns, campaign_id), E_CAMPAIGN_NOT_FOUND);

        let participant = Participant {
            id: campaign_id,
            user: signer_addr,
            points: 0,
        };

        table::add(&mut campaign_store.participants, signer_addr, participant);
    }

    // Update participant points
    public entry fun update_participant_points(
        account: &signer,
        participant_addr: address,
        points: u64
    ) acquires CampaignStore {
        let campaign_store = borrow_global_mut<CampaignStore>(@dashh_add);
        
        assert!(table::contains(&campaign_store.participants, participant_addr), E_CAMPAIGN_NOT_FOUND);
        
        let participant = table::borrow_mut(&mut campaign_store.participants, participant_addr);
        participant.points = points;
    }

    // Get campaign details
    #[view]
    public fun get_campaign(campaign_id: u64): (String, String, String, String, u64, u64, address) acquires CampaignStore {
        let campaign_store = borrow_global<CampaignStore>(@dashh_add);
        let campaign = table::borrow(&campaign_store.campaigns, campaign_id);
        
        (
            campaign.title,
            campaign.image,
            campaign.description,
            campaign.label,
            campaign.endtime,
            campaign.reward,
            campaign.owner
        )
    }

    // Get participant details
    #[view]
    public fun get_participant(participant_addr: address): (u64, address, u64) acquires CampaignStore {
        let campaign_store = borrow_global<CampaignStore>(@dashh_add);
        let participant = table::borrow(&campaign_store.participants, participant_addr);
        
        (
            participant.id,
            participant.user,
            participant.points
        )
    }

    // Get all campaigns
    #[view]
    public fun get_campaign_count(): u64 acquires CampaignStore {
        let campaign_store = borrow_global<CampaignStore>(@dashh_add);
        campaign_store.campaign_count
    }
}
