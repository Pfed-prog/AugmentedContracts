# Create Ocean instance
from ocean_lib.web3_internal.utils import connect_to_network
connect_to_network("development")

from ocean_lib.example_config import get_config_dict
config = get_config_dict("development")

from ocean_lib.ocean.ocean import Ocean
ocean = Ocean(config)

# Create OCEAN object. Barge auto-created OCEAN, and ocean instance knows
OCEAN = ocean.OCEAN_token

# Mint fake OCEAN to Alice & Bob
from ocean_lib.ocean.mint_fake_ocean import mint_fake_OCEAN
mint_fake_OCEAN(config)

# Create Alice's wallet
import os
from brownie.network import accounts
accounts.clear()

alice_private_key = os.getenv("TEST_PRIVATE_KEY1")
alice = accounts.add(alice_private_key)
assert alice.balance() > 0, "Alice needs ETH"
assert OCEAN.balanceOf(alice) > 0, "Alice needs OCEAN"

# Create additional wallets. While some flows just use Alice wallet, it's simpler to do all here.
bob_private_key = os.getenv('TEST_PRIVATE_KEY2')
bob = accounts.add(bob_private_key)
assert bob.balance() > 0, "Bob needs ETH"
assert OCEAN.balanceOf(bob) > 0, "Bob needs OCEAN"

# Compact wei <> eth conversion
from ocean_lib.ocean.util import to_wei, from_wei

#data info
name = "Branin dataset"
url = "https://raw.githubusercontent.com/trentmc/branin/main/branin.arff"

#create data asset
(data_nft, datatoken, ddo) = ocean.assets.create_url_asset(name, url, {"from": alice})

#print
print("Just published asset:")
print(f"  data_nft: symbol={data_nft.symbol()}, address={data_nft.address}")
print(f"  datatoken: symbol={datatoken.symbol()}, address={datatoken.address}")
print(f"  did={ddo.did}")

# Specify metadata and services, using the Branin test dataset
date_created = "2021-12-28T10:55:11Z"
metadata = {
    "created": date_created,
    "updated": date_created,
    "description": "Branin dataset",
    "name": "Branin dataset",
    "type": "dataset",
    "author": "Trent",
    "license": "CC0: PublicDomain",
}

# Use "UrlFile" asset type. (There are other options)
from ocean_lib.structures.file_objects import UrlFile
url_file = UrlFile(
    url="https://raw.githubusercontent.com/trentmc/branin/main/branin.arff"
)

# Publish data asset
from ocean_lib.models.datatoken_base import DatatokenArguments
_, _, ddo = ocean.assets.create(
    metadata,
    {"from": alice},
    datatoken_args=[DatatokenArguments(files=[url_file])],
)

data_nft = ocean.data_nft_factory.create({"from": alice}, 'NFT1', 'NFT1')

datatoken = data_nft.create_datatoken({"from": alice}, "Datatoken 1", "DT1")

from ocean_lib.models.fixed_rate_exchange import ExchangeArguments
(data_nft, datatoken, ddo) = ocean.assets.create_url_asset(
    name,
    url,
    {"from": alice},
    pricing_schema_args=ExchangeArguments(rate=to_wei(3), base_token_addr=ocean.OCEAN_address, dt_decimals=18)
)

assert len(datatoken.get_exchanges()) == 1


from ocean_lib.ocean.util import to_wei

#Approach A: Alice mints datatokens to Bob
datatoken.mint(bob, to_wei(1), {"from": alice})
