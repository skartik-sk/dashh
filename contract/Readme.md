# Campaign Module for Aptos Blockchain

## Overview

The `campaign_module` is a smart contract implemented in Move for the Aptos blockchain that allows users to create and manage campaigns, as well as participate in them. The module provides functionalities to initialize a campaign manager, create campaigns, add participants, and update participant points.

## Module Structure

### Data Structures

#### `Campaign`

A structure representing a campaign with the following fields:

```move
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
```

#### `Participant`

A structure representing a participant in a campaign:

```move
struct Participant has copy, drop, store {
    id: u64,
    user: address,
    points: u64
}
```

#### `CampaignManager`

Manages all campaigns and their participants:

```move
struct CampaignManager has key {
    campaigns: Table<u64, Campaign>,
    participants: Table<u64, vector<Participant>>
}
```

## Functions

### `initialize_campaign_manager`

Initializes the campaign manager and associates it with the given account.

```move
public fun initialize_campaign_manager(account: &signer)
```

### `create_campaign`

Creates a new campaign with the specified details.

```move
public entry fun create_campaign(
    account: &signer,
    campaign_id: u64,
    title: String,
    image: String,
    description: String,
    label: String,
    end_time: u64,
    reward: u64
) acquires CampaignManager
```

#### Parameters:

- `account`: Signer of the account creating the campaign.
- `campaign_id`: Unique identifier for the campaign.
- `title`: Campaign title.
- `image`: URL of the campaign image.
- `description`: Description of the campaign.
- `label`: Label/tag for the campaign.
- `end_time`: Timestamp representing campaign end time.
- `reward`: Reward amount for the campaign.

### `create_participant`

Adds a participant to an existing campaign.

```move
public entry fun create_participant(
    account: &signer,
    campaign_id: u64
) acquires CampaignManager
```

#### Parameters:

- `account`: Signer of the participant.
- `campaign_id`: ID of the campaign to join.

### `update_participant_points`

Updates points for a participant in a campaign.

```move
public entry fun update_participant_points(
    account: &signer,
    campaign_id: u64,
    points: u64
) acquires CampaignManager
```

#### Parameters:

- `account`: Signer of the participant.
- `campaign_id`: ID of the campaign.
- `points`: New points to be updated.

### `get_campaign`

Retrieves campaign details by ID.

```move
public fun get_campaign(sender: address, campaign_id: u64): Campaign acquires CampaignManager
```

#### Parameters:

- `sender`: Address of the campaign owner.
- `campaign_id`: ID of the campaign to retrieve.

#### Returns:

- A `Campaign` struct containing campaign details.

## Usage

1. Deploy the module to the Aptos blockchain.
2. Call `initialize_campaign_manager` to set up the campaign manager.
3. Use `create_campaign` to add new campaigns.
4. Participants can join using `create_participant`.
5. Use `update_participant_points` to track engagement.
6. Retrieve campaign details using `get_campaign`.

## License

This project is licensed under the Aarambh labs

