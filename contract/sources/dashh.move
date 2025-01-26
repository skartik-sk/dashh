module dashh_add::campaign_module {
    use std::signer;
    use std::string::String;
    use std::vector;
    use aptos_std::table::{Self, Table};

    // Add copy, drop, and store abilities
    struct Campaign has copy, drop, store {
        id: u64,
        title: String,
        image: String,
        description: String,
        label: String,
        end_time: u64,
        reward: u64,
        owner: address
    }

    // Add copy, drop, and store abilities
    struct Participant has copy, drop, store {
        id: u64,
        user: address,
        points: u64
    }

    struct CampaignManager has key {
        campaigns: Table<u64, Campaign>,
        participants: Table<u64, vector<Participant>>
    }

    public fun initialize_campaign_manager(account: &signer) {
        let manager = CampaignManager {
            campaigns: table::new(),
            participants: table::new()
        };
        move_to(account, manager);
    }

    public entry fun create_campaign(
        account: &signer,
        campaign_id: u64,
        title: String,
        image: String,
        description: String,
        label: String,
        end_time: u64,
        reward: u64
    ) acquires CampaignManager {
        let sender = signer::address_of(account);
        let campaign_manager = borrow_global_mut<CampaignManager>(sender);

        let campaign = Campaign {
            id: campaign_id,
            title,
            image,
            description,
            label,
            end_time,
            reward,
            owner: sender
        };

        table::add(&mut campaign_manager.campaigns, campaign_id, campaign);
    }

    public entry fun create_participant(
        account: &signer,
        campaign_id: u64
    ) acquires CampaignManager {
        let sender = signer::address_of(account);
        let campaign_manager = borrow_global_mut<CampaignManager>(sender);

        // Initialize participants table for campaign if not exists
        if (!table::contains(&campaign_manager.participants, campaign_id)) {
            table::add(&mut campaign_manager.participants, campaign_id, vector::empty());
        };

        let participant = Participant {
            id: campaign_id,
            user: sender,
            points: 0
        };

        let campaign_participants = table::borrow_mut(&mut campaign_manager.participants, campaign_id);
        vector::push_back(campaign_participants, participant);
    }

    public entry fun update_participant_points(
        account: &signer,
        campaign_id: u64,
        points: u64
    ) acquires CampaignManager {
        let sender = signer::address_of(account);
        let campaign_manager = borrow_global_mut<CampaignManager>(sender);

        let campaign_participants = table::borrow_mut(&mut campaign_manager.participants, campaign_id);
        vector::for_each_mut(campaign_participants, |participant| {
            if (participant.user == sender) {
                participant.points = points;
            }
        });
    }

    // Modified to return a copy instead of a reference
    public fun get_campaign(sender: address, campaign_id: u64): Campaign acquires CampaignManager {
        let campaign_manager = borrow_global<CampaignManager>(sender);
        *table::borrow(&campaign_manager.campaigns, campaign_id)
    }
}